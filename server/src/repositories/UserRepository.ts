import { Repository } from "typeorm";
import { AppDataSource } from "../config/db";
import { User } from "../models/User";

export const UserRepository: Repository<User> = AppDataSource.getRepository(User);
