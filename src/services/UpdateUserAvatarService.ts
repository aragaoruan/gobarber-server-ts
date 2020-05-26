import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userReposytory = getRepository(User);

    const user = await userReposytory.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      // DELETE avatar

      const userAvatarFilePash = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePash);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePash);
      }
    }

    user.avatar = avatarFilename;

    await userReposytory.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
