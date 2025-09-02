
interface FairData {
  success: boolean;
  data: any;
}

export function fairGetData(): Promise<FairData> {
  return new Promise( (resolve, reject) => {
    try {
     fetch(`https://eos.greymass.com/`, {
        headers: { "Content-Type": "application/json" },
      }).then(res => {

      if (res !== undefined && res.status === 200) {
        res.json().then((data) => {
                  resolve({ success: true, data });

        });
      } else {
        reject(new Error("Failed to fetch data"));
      }
      })
    } catch (err) {
      reject(err);
    }
  });
}
