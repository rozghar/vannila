export const fetchAddressByPinCode = async (pinCode) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_ADDRESS_API_URL + pinCode;
    const response = await fetch(apiUrl);
    let data = await response.json();
    data = data[0].PostOffice;
    // console.log("🚀 ------------------------------------------🚀");
    // console.log("🚀 ~ fetchAddressByPinCode ~ data:", data);
    // console.log("🚀 ------------------------------------------🚀");
    const state = data[0].State;
    const mainDict = {};
    for (let i = 0; i < data.length; i++) {
      const elem = data[i];
      if (elem.District in mainDict) {
        mainDict[elem.District].push(elem.Name);
      } else {
        mainDict[elem.District] = [elem.Name];
      }
    }
    return { listOfDistricts: mainDict, state };
  } catch (error) {
    console.error("🚀 --------------------------------------------🚀");
    console.error("🚀 ~ fetchAddressByPinCode ~ error:", error);
    console.error("🚀 --------------------------------------------🚀");

    return null;
  }
};
