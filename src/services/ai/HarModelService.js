import { Platform } from 'react-native';

let loadTensorflowModel = null;
try {
    const tflite = require('react-native-fast-tflite');
    loadTensorflowModel = tflite.loadTensorflowModel;
} catch (e) {
    console.warn("fast-tflite native module not found. AI will be mocked. Please use a Dev Build (npx expo run:android) to enable real AI.");
}

class HarModelService {
    constructor() {
        this.model = null;
        this.isReady = false;
    }

    async initialize() {
        if (!loadTensorflowModel) return;
        try {

            this.model = await loadTensorflowModel(require('../../../assets/models/cnn_har.tflite'));
            this.isReady = true;
            console.log("HAR Model loaded successfully");
        } catch (err) {
            console.error("Failed to load TFLite model:", err);
        }
    }

    async predict(preprocessedData) {

        if (!this.isReady || !this.model) {

            return "IDLE";
        }
        try {
            const inputData = new Float32Array(preprocessedData);
            const result = await this.model.run([inputData]);

            const probs = result[0];
            const classes = ["IDLE", "RUN", "WALK"];

            let maxIdx = 0;
            let maxProb = probs[0];
            for (let i = 1; i < probs.length; i++) {
                if (probs[i] > maxProb) {
                    maxProb = probs[i];
                    maxIdx = i;
                }
            }

            return classes[maxIdx];
        } catch (err) {
            console.error("Prediction error:", err);
            return "IDLE";
        }
    }
}

export const harModelService = new HarModelService();
