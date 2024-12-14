const fs = require('fs');

const data = fs.readFileSync('./d1.txt',
  { encoding: 'utf8'}).split('\n').reduce((prev, curr)=>{
    const [a,b] = curr.split(/ +/);

    prev[0].push(+a)
    prev[1].push(+b)

    return prev
    
  },[[],[]])

const s1 = data[0].sort((a,b)=> a -b)
const s2 = data[1].sort((a,b)=> a -b)


let c = 0;
for(let i = 0; i <s1.length; i++){
  c+= Math.abs(s1[i] - s2[i])
};

const data2 = fs.readFileSync('./d1.txt',
  { encoding: 'utf8'}).split('\n').reduce((prev, curr)=>{
    const [a,b] = curr.split(/ +/);

    return prev + Math.abs(a-b)
    
  },0)
console.log(c, data2)




