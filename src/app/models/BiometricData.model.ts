export interface BiometricData {
  id?: number;
  facialRecognitionImages: string[];
  fingerprints: string[];
  leftEyeScan: string;
  rightEyeScan: string;
  personId: number;
}
