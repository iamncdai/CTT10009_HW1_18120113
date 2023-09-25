const rl = require('readline');
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Hàm để chuyển đổi số thập phân thành chuỗi nhị phân với số bit cho trước
function decimalToBinary(decimal, numBits) {
  let binary = (decimal >>> 0).toString(2); // >>> 0 đảm bảo chuyển đổi thành số không dấu
  while (binary.length < numBits) {
    binary = '0' + binary; // Thêm số 0 đứng đầu nếu cần
  }
  return binary;
}

// Hàm để tính toán bù 1 của một chuỗi nhị phân
function onesComplement(binary) {
  return binary.split('').map(bit => (bit === '0' ? '1' : '0')).join('');
}

// Hàm để tính toán bù 2 của một chuỗi nhị phân
function twosComplement(binary) {
  let carry = 1;
  let twosComplement = '';

  for (let i = binary.length - 1; i >= 0; i--) {
    const bit = binary[i];

    if (bit === '0' && carry === 1) {
      twosComplement = '1' + twosComplement;
      carry = 0;
    } else if (bit === '1' && carry === 1) {
      twosComplement = '0' + twosComplement;
    } else {
      twosComplement = bit + twosComplement;
    }
  }

  return twosComplement;
}

readline.question("Input a signed integer X (8-bit): ", function (input) {
  const x = parseInt(input);

  if (x >= -128 && x <= 127) {
    const binary = decimalToBinary(x, 8);
    const signMagnitude = (x < 0 ? '1' : '0') + binary.slice(1);
    const onesComp = onesComplement(binary);
    const twosComp = twosComplement(binary);

    console.log(`a. Sign-Magnitude form: ${signMagnitude}`);
    console.log(`b. 1's complement form: ${onesComp}`);
    console.log(`c. 2's complement form: ${twosComp}`);
  } else {
    console.log("Invalid input. Please enter a signed 8-bit integer (-128 to 127).");
  }

  readline.close();
});
