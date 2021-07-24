import { NodeTracerProvider } from '@opentelemetry/node';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { Resource } from '@opentelemetry/resources';
import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';

export const tracing = () => {
  const provider: NodeTracerProvider = new NodeTracerProvider({
    resource: new Resource({
      'service.name': 'payment-service',
      application: 'restaurant',
    }),
  });
  provider.addSpanProcessor(
    new SimpleSpanProcessor(
      new ZipkinExporter({
        url: `${process.env.ZIPKIN_BACKEND_URL}/api/v2/spans`,
      }),
    ),
  );

  provider.register();

  registerInstrumentations({
    instrumentations: [new ExpressInstrumentation(), new HttpInstrumentation()],
  });
};
