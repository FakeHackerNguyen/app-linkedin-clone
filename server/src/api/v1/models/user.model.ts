import {Schema, model} from 'mongoose';
import {randomBytes, scryptSync} from 'crypto';
import IUser, {UserRole} from '../interfaces/feature/user/user.interface';

const userSchema = new Schema<IUser>({
  provider: {
    type: String,
    required: true,
    default: 'local',
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  fullName: String,
  location: {
    default: '',
    type: String,
    trim: true,
  },
  about: {
    default: '',
    type: String,
    trim: true,
  },
  headline: String,
  cover: {
    type: Object,
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    default: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1709004468/avatars/cover',
      public_id: 'avatars/cover',
    },
  },
  avatar: {
    type: Object,
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    default: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1709004468/avatars/default-avatar.png',
      public_id: 'avatars/default-avatar',
    },
  },
  educations: [
    {
      type: Object,
      school: {
        type: Object,
        avatar: {
          type: Object,
          url: String,
          public_id: String,
        },
        name: String,
        location: String,
      },
      fieldOfStudy: String,
      degree: String,
      grade: Number,
      activities: String,
      description: String,
      skills: [
        {
          type: String,
          trim: true,
        },
      ],

      startStudy: Date,
      endStudy: Date,
      _id: false, // remove _id from subdocument
    },
  ],
  experiences: [
    {
      type: Object,
      company: {
        type: Object,
        avatar: {
          type: Object,
          url: String,
          public_id: String,
        },
        name: String,
        industry: String,
      },
      jobTitle: String,
      employmentType: String,
      location: String,
      description: String,
      skills: [
        {
          type: String,
          trim: true,
        },
      ],
      startWork: Date,
      endWork: Date,
      _id: false, // remove _id from subdocument
    },
  ],
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  },
  connections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Connection',
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

userSchema.pre('save', function (next) {
  const salt = randomBytes(16).toString('hex');
  if (this.isModified('password')) {
    this.password = scryptSync(this.password, salt, 32).toString('hex') + salt;
  }

  next();
});

userSchema.methods.comparePassword = function (password: string): boolean {
  const salt = this.password.slice(64);
  const originalPassHash = this.password.slice(0, 64);
  const currentPassHash = scryptSync(password, salt, 32).toString('hex');
  return originalPassHash === currentPassHash;
};

userSchema.index({fullName: 'text'});
export default model<IUser>('User', userSchema);
