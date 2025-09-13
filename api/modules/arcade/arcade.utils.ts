// import EventEmitter from 'events';

// This is now a proper class, as the original code intended.
export class Utils {
    // The emitter is part of the constructor but not used in the methods.
    // It's kept here to match the original structure.
    // constructor() {}

    public DecimalToHex(d: number, padding: number): string {
        let hex = Number(d).toString(16);
        padding = typeof (padding) === "undefined" || padding === null ? 2 : padding;
        while (hex.length < padding) {
            hex = "0" + hex;
        }
        return hex;
    }

    public HexToDecimal(hex: string): number {
        return parseInt(hex, 16);
    }
    
    public FixNumber(num: number): number {
        num = parseFloat(num.toString());
        return (Math.round((num * 10000)) / 10000);
    }
    
    // ... all other utility functions converted to public methods ...
    // e.g., DecodeMessage, ShuffleArray, CookieParse, etc.

      // Change the type here from ArrayBuffer to ArrayBufferLike
    public DecodeMessage(arrayBuffer: ArrayBufferLike): string {
      let result = "";
      let i = 0;
      let c = 0;
    //   const c1 = 0;
      let c2 = 0;
      let c3 = 0;

      // This line works perfectly with ArrayBufferLike, so no other change is needed.
      const data = new Uint8Array(arrayBuffer);

      if (data.length >= 3 && data[0] === 0xef && data[1] === 0xbb && data[2] === 0xbf) {
        i = 3;
      }

      while (i < data.length) {
        c = data[i];

        if (c < 128) {
          result += String.fromCharCode(c);
          i++;
        } else if (c > 191 && c < 224) {
          if (i + 1 >= data.length) {
            break; 
          }
          c2 = data[i + 1];
          result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          if (i + 2 >= data.length) {
            break;
          }
          c2 = data[i + 1];
          c3 = data[i + 2];
          result += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return result;
    }

    public ShuffleArray<T>(array: T[]): T[] {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
 public EncodeMessage(str:string) {
  //  return new TextEncoder().encode(str);
    const buf = new ArrayBuffer(str.length * 1) // 2 bytes for each char
    const bufView = new Uint8Array(buf)
    for (let i = 0, strLen = str.length; i < strLen; i++)
      bufView[i] = str.charCodeAt(i)

    return buf
 }
    public CookieParse(cStr: string): { [key: string]: string } {
        const tmpCArr = cStr.split(";");
        const CArr: { [key: string]: string } = {};
        for (let i = 0; i < tmpCArr.length; i++) {
            const cta = tmpCArr[i].split("=");
            if(cta.length > 1) {
                cta[0] = cta[0].replace(/ +/g, ' ').trim();
                CArr[cta[0]] = cta[1];
            }
        }
        return CArr;
    }

    public RandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public RandomFloat(dl: number = 1): number {
        return Math.random() * (this.RandomInt(-1 * dl, 1 * dl) + Math.random());
    }
}

// // function Utils(emitter) {

// // var _self = this;   

// ///////////////


// ///////////////////
// ///////////////////

// export function DecimalToHex(d, padding) {
//     let hex = Number(d).toString(16);
//     padding = typeof (padding) === "undefined" || padding === null ? 2 : padding;

//     while (hex.length < padding) {
//         hex = "0" + hex;
//     }

//     return hex;
// }

// export function HexToDecimal(hex) {
//     return parseInt(hex, 16);
// }

// // ... (all other utility functions from the original file) ...

// export function RandomFloat(dl = 1) {
//     return Math.random() * (RandomInt(-1 * dl, 1 * dl) + Math.random());
// }

// ///////////////////
// ///////////////////

// export function FixNumber(num){ 

// num=parseFloat(num);
// var rnum=(Math.round((num*10000))/10000);

// return rnum; 

// }

// ///////////////////
// ///////////////////
// ///////////////////
// export function hexToArrayBuffer  (hex) {
//   if (typeof hex !== 'string') {
//     throw new TypeError('Expected input to be a string')
//   }

//   if ((hex.length % 2) !== 0) {
//     throw new RangeError('Expected string to be an even number of characters')
//   }

//   var view = new Uint8Array(Math.round(hex.length / 2))

//   for (var i = 0; i < hex.length; i += 2) {
//     view[i / 2] = parseInt(hex.substring(i, i + 2), 16)
//   }

//   return view.buffer
// }




// ///////////////
// ///////////////

export function EncodeMessage(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// ///////////

// export function DecodeMessage(arrayBuffer) {
//   var result = "";
//   var i = 0;
//   var c = 0;
//   var c1 = 0;
//   var c2 = 0;
//   var c3 = 0;

//   var data = new Uint8Array(arrayBuffer);

//   // If we have a BOM skip it
//   if (data.length >= 3 && data[0] === 0xef && data[1] === 0xbb && data[2] === 0xbf) {
//     i = 3;
//   }

//   while (i < data.length) {
//     c = data[i];

//     if (c < 128) {
//       result += String.fromCharCode(c);
//       i++;
//     } else if (c > 191 && c < 224) {
//       if( i+1 >= data.length ) {
//       //throw "UTF-8 Decode failed. Two byte character was truncated.";
//       }
//       c2 = data[i+1];
//       result += String.fromCharCode( ((c&31)<<6) | (c2&63) );
//       i += 2;
//     } else {
//       if (i+2 >= data.length) {
//       //  throw "UTF-8 Decode failed. Multi byte character was truncated.";
//       }
//       c2 = data[i+1];
//       c3 = data[i+2];
//       result += String.fromCharCode( ((c&15)<<12) | ((c2&63)<<6) | (c3&63) );
//       i += 3;
//     }
//   }
//   return result;
// }

// //////////////////////////


// export function ShuffleArray(array) {
//   var currentIndex = array.length, temporaryValue, randomIndex;
//   while (0 !== currentIndex) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }


// export function CookieParse(cStr) {

// let  tmpCArr=cStr.split(";");
// let  CArr: Record<string, string> = {};

// for(var i=0; i<tmpCArr.length; i++){

// let cta=tmpCArr[i].split("=");
// cta[0]= cta[0].replace(/ +/g, ' ').trim();
// CArr[cta[0]]=cta[1];
	
// }

// return CArr;
// };


//  export function RandomInt(min, max)
// {

//   return Math.floor(Math.random() * (max - min + 1)) + min;

// };

// //  export function RandomFloat(dl=1)
// // {

// //   return Math.random()*( RandomInt(-1*dl,1*dl)+Math.random());

// // };

	
	
// // return _self;	
	
// // }



// // module.exports = { Utils }
