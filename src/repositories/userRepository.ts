// src/repositories/userRepository.ts

import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  // Create a new user
  async create(email: string, password: string): Promise<User> {
    return await prisma.user.create({
      data: { email, password },
    });
  }

  // Find a user by ID
  async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  // Delete a user
  async delete(id: number): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  }

  // Get all users (optional)
  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }
}
