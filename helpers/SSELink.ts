import { ApolloLink, Operation, FetchResult, Observable } from '@apollo/client/core';
import { print } from 'graphql';
import EventSource from 'eventsource';

type SSELinkOptions = EventSourceInit & { uri: string };

export class SSELink extends ApolloLink {
  constructor(private options: SSELinkOptions) {
    super();
  }

  request(operation: Operation): Observable<FetchResult> {
    const url = new URL(this.options.uri);
    url.searchParams.append('query', print(operation.query));
    if (operation.operationName) {
      url.searchParams.append('operationName', operation.operationName);
    }
    if (operation.variables) {
      url.searchParams.append('variables', JSON.stringify(operation.variables));
    }
    if (operation.extensions) {
      url.searchParams.append('extensions', JSON.stringify(operation.extensions));
    }

    return new Observable((sink) => {
      const eventsource = new EventSource(url.toString(), this.options);
      eventsource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        sink.next(data);
        if (eventsource.readyState === 2) {
          sink.complete();
        }
      };
      eventsource.onerror = (error) => {
        sink.error(error);
      };
      eventsource.addEventListener('complete', () => {
        eventsource.close(); // If operation ends, close the connection and prevent the client from reconnecting
      });
      return () => eventsource.close();
    });
  }
}
