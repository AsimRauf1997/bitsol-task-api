import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDTO) {
    return await this.userModel.create(createUserDto);
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;

    const users = await this.userModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .sort({ _id: 1 })
      .exec();

    return {
      users,
    };
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
