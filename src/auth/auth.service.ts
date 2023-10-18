import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user-schema';
import { compareHashPassword } from 'src/utils/password-hash';
import { LoginDto } from './dto/login';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({
      username: loginDto.username,
    });

    if (!user) {
      return 'Invalid User Name';
    }

    const isMatch = compareHashPassword(loginDto.password, user.password);

    if (!isMatch) {
      return 'Invalid Password';
    }

    return 'Login successful';
  }
}
