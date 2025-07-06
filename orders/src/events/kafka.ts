import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "orders-service",
  brokers: ["localhost:9092"], // replace with actual Kafka broker address if needed
});

export const producer = kafka.producer();

// const producer = kafka.producer({
//   acks: 1, // wait for at least one broker to acknowledge the message
//   retries: 3, // retry sending the message up to 3 times
// });

export const initKafka = async () => {
  await producer.connect();
  console.log("✅ Kafka Producer Connected");
};
// kafka-topics.sh --create --topic order-created --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
