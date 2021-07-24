import { CollectorTraceExporter } from '@opentelemetry/exporter-collector';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NodeTracerProvider } from '@opentelemetry/node';
import { Resource } from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/tracing';

export const tracing = () => {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      'service.name': 'payment-service',
      application: 'restaurant',
    }),
  });
  const exporter = new CollectorTraceExporter({
    url: `${process.env.OTEL_COLLECTOR_URL}`,
  });
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register();

  registerInstrumentations({
    instrumentations: [new ExpressInstrumentation(), new HttpInstrumentation()],
  });
};
