export interface Experience {
  company: {
    avatar: {
      url: string;
      public_id: string;
    };
    name: string;
    typeOfBusiness: string;
  };
  jobTitle: string;
  typeEmployment?: string;
  description?: string;
  location?: string;
  locationType?: string;
  industry?: string;
  skills?: Array<string>;
  startWork?: Date;
  endWork?: Date;
}

export interface Education {
  school: {
    avatar: {
      url: string;
      public_id: string;
    };
    name: string;
    location: string;
  };
  fieldOfStudy?: string;
  degree?: string;
  grade?: number;
  activities?: string;
  description?: string;
  skills?: Array<string>;
  startStudy?: Date;
  endStudy?: Date;
}
