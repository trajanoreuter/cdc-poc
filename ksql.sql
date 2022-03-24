SET 'auto.offset.reset' = 'earliest';

CREATE STREAM IF NOT EXISTS TODOS_SRC WITH (
  KAFKA_TOPIC = 'postgres.public.Todos',
  VALUE_FORMAT = 'AVRO'
);

CREATE STREAM USERS_SRC WITH (
  KAFKA_TOPIC = 'postgres.public.Users',
  VALUE_FORMAT = 'AVRO'
);

