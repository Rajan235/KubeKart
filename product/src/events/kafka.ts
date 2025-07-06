import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKERS_ADDRESS!], // replace with actual Kafka broker address if needed
});

export const producer = kafka.producer();

export const initKafka = async () => {
  await producer.connect();
  console.log("✅ Kafka Producer Connected");
};
