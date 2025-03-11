export interface Person {
  id?: number;
  lastName: string;
  firstName: string;
  maidenName?: string;
  birthDate: Date; // Utilisation de Date pour la gestion des dates
  birthPlace: string;
  nationalityID: string;
  nationality: Nationality; // Enumération pour nationalité
  gender: Gender; // Enumération pour le genre
  ethnicGroup?: EthnicGroup; // Enumération pour le groupe ethnique
  birthCertificateNumber?: string;
  fathersName?: string;
  mothersName?: string;
  fathersProfession?: string;
  mothersProfession?: string;
  currentAddress: string;
  phoneNumber: string;
  emailAddress: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  bloodType?: BloodType; // Enumération pour le groupe sanguin
  allergies?: PersonAllergies[]; // Tableau pour plusieurs allergies
  disabilities?: string;
  educationLevel?: string;
  profession?: string;
  maritalStatus?: MaritalStatus; // Enumération pour le statut marital
  occupation?: string;
  religion?: string;
  voterStatus?: string;
  taxIdentificationNumber?: string;
  socialSecurityNumber?: string;
  drivingLicenseNumber?: string;
  passportNumber?: string;
}

export enum PersonAllergies {
  PEANUTS = 'PEANUTS',
  TREE_NUTS = 'TREE_NUTS',
  MILK = 'MILK',
  EGGS = 'EGGS',
  WHEAT = 'WHEAT',
  SOY = 'SOY',
  FISH = 'FISH',
  SHELLFISH = 'SHELLFISH',
  GLUTEN = 'GLUTEN',
  POLLEN = 'POLLEN',
  DUST = 'DUST',
  MOLD = 'MOLD',
  PET_DANDER = 'PET_DANDER',
  INSECT_STINGS = 'INSECT_STINGS',
  LATEX = 'LATEX',
  MEDICATIONS = 'MEDICATIONS',
}


export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
  SEPARATED = 'SEPARATED',
  UNKNOWN = 'UNKNOWN',
}

export enum Nationality {
  AFGHAN = 'AFGHAN',
  ALBANIAN = 'ALBANIAN',
  ALGERIAN = 'ALGERIAN',
  AMERICAN = 'AMERICAN',
  // Ajoute toutes les nationalités nécessaires
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  UNKNOWN = 'UNKNOWN',
}

export enum EthnicGroup {
  AFRICAN = 'AFRICAN',
  ASIAN = 'ASIAN',
  EUROPEAN = 'EUROPEAN',
  LATIN_AMERICAN = 'LATIN_AMERICAN',
  NATIVE_AMERICAN = 'NATIVE_AMERICAN',
  PACIFIC_ISLANDER = 'PACIFIC_ISLANDER',
  OTHER = 'OTHER',
}

export enum BloodType {
  A_POSITIVE = 'A_POSITIVE',
  A_NEGATIVE = 'A_NEGATIVE',
  B_POSITIVE = 'B_POSITIVE',
  B_NEGATIVE = 'B_NEGATIVE',
  AB_POSITIVE = 'AB_POSITIVE',
  AB_NEGATIVE = 'AB_NEGATIVE',
  O_POSITIVE = 'O_POSITIVE',
  O_NEGATIVE = 'O_NEGATIVE',
}

