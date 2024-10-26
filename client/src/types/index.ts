export type Company = {
  name: string;
  avatar: {
    url: string;
    public_id: string;
  };
  industry: string;
};

export type School = {
  name: string;
  avatar: {
    url: string;
    public_id: string;
  };
  location: string;
};

export type Experience = {
  company: Company;
  jobTitle: string;
  employmentType: string;
  description: string;
  location: string;
  locationType: string;
  startWork: Date;
  endWork: Date;
};
export type Education = {
  school: School;
  fieldOfStudy: string;
  degree: string;
  grade: number;
  activities: string;
  description: string;
  startStudy: Date;
  endStudy: Date;
};

export type Connection = {
  requester: User;
  recipient: User;
  status: string;
  note: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: {
    url: string;
    public_id: string;
  };
  cover: {
    url: string;
    public_id: string;
  };
  location: string;
  headline: String;
  about: string;
  experiences: Array<Experience>;
  educations: Array<Education>;
  connections: Array<Connection>;
  followers: Array<User>;
  following: Array<User>;
};

export type Post = {
  _id: string;
  content: string;
  user: User;
  media: {
    url: string;
    public_id: string;
    resource_type: string;
  };
  visibility: string;
  commentControl: string;
};
