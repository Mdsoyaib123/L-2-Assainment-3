import { Schema } from 'mongoose';
import { TUser } from './user.interface';
import validator from 'validator';

export const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not email type ',
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
