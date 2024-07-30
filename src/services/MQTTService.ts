import mqtt, { MqttClient } from "mqtt";

export class MQTTService {
    private client: MqttClient | null = null;

    private onMessageCallback: ((topic: string, message: Buffer) => void) | null = null;

    connect(brokerUrl: string, onConnectCallback: () => void, onMessageCallback: (topic: string, message: Buffer) => void) {
        this.client = mqtt.connect(brokerUrl);
        this.onMessageCallback = onMessageCallback;

        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            onConnectCallback();
        });

        this.client.on('message', (topic, message) => {
            if (this.onMessageCallback) {
                this.onMessageCallback(topic, message);
            }
        });

        this.client.on('error', (error) => {
            console.log(`Connection error: ${error}`);
        });

        this.client.on('close', () => {
            console.log('Connection closed.');
        });
    }

    subscribe(topic: string) {
        if (this.client) {
            this.client.subscribe(topic, (err) => {
                if (!err) {
                    console.log(`Subscribed to topic ${topic}`);
                }
            });
        }
    }

    disconnect() {
        if (this.client && this.client.connected) {
            this.client.end();
            console.log('Disconnected from MQTT broker');
        }
    }
}