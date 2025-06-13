import { PrismaClient, Importance } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      password: await bcrypt.hash('password123', 10),
      events: {
        create: [
          {
            title: 'Team Meeting',
            description: 'Weekly team sync',
            date: new Date('2024-03-20T10:00:00Z'),
            importance: Importance.NORMAL,
          },
          {
            title: 'Project Deadline',
            description: 'Submit final project deliverables',
            date: new Date('2024-03-25T17:00:00Z'),
            importance: Importance.CRITICAL,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      password: await bcrypt.hash('password456', 10),
      events: {
        create: [
          {
            title: 'Doctor Appointment',
            description: 'Annual checkup',
            date: new Date('2024-03-22T14:30:00Z'),
            importance: Importance.IMPORTANT,
          },
          {
            title: 'Birthday Party',
            description: 'Friend\'s birthday celebration',
            date: new Date('2024-03-24T19:00:00Z'),
            importance: Importance.NORMAL,
          },
        ],
      },
    },
  });

  console.log('Seed data created successfully!');
  console.log('Created users:', { user1: user1.email, user2: user2.email });
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 