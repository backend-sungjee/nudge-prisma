# Description

for reproduction of this problem 
https://github.com/prisma/prisma/issues/16912#issuecomment-1622605478

The problem occurs when doing upserts of 250k records in parallel.

```typescript
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

```

# Report file

.clinic/4.8.1.html

<img width="833" alt="스크린샷 2023-07-07 15 09 17" src="https://github.com/ssungjeee/nudge-prisma/assets/138547449/86ffd4d0-22c7-4357-8635-942d01b7fe93">

.clinic/4.9.0.html

<img width="828" alt="스크린샷 2023-07-07 15 09 32" src="https://github.com/ssungjeee/nudge-prisma/assets/138547449/2a892b4e-fcd5-44ee-af76-ee0a700cd655">



# Clone
```
git clone https://github.com/ssungjeee/nudge-prisma.git
```

# Run
```
npm run main
```

# Generate memory profiling document
```
clinic doctor -- node index
```

