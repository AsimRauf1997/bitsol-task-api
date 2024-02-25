// seeder.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async seedUsers() {
    try {
      // Delete all existing users to start fresh
      await this.userModel.deleteMany({});

      // Seed 10 users
      const usersToSeed = Array.from({ length: 1000 }, (_, index) => ({
        name: `User ${index + 1}`,
        email: `user${index + 1}@example.com`,
        addresses: [
          {
            addressLine1: `AddressLine1_${index + 1}`,
            addressLine2: `AddressLine2_${index + 1}`,
            city: `City_${index + 1}`,
            state: `State_${index + 1}`,
            country: `Country_${index + 1}`,
          },
        ],
        role: 'user',
        phoneNo: `123456789${index}`,
      }));
      await this.userModel.create(usersToSeed);

      console.log('Seeding completed successfully!');
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  }
}
