import {PrismaClient} from "@prisma/client";
import {randomInt} from "crypto";

const prisma = new PrismaClient();

async function main() {
    const arr = [];

    for (let i = 1; i <= 20; i++){
        arr.push(i);
    }
    let cnt = 4000;
    while (cnt>0) {
        cnt--;
        await Promise.all(
            arr.map(async () => {
                const data = { id : randomInt(250000) };
                await prisma.user.upsert({
                    where: { id: data.id },
                    create: data,
                    update: data,
                });
            })
        );
    }
}

main();