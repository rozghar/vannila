export const statesDistricts = {
  'westbengal': {
    name: 'West Bengal',
    districts: {
      'kolkata': { name: 'Kolkata', villages: ['Bhawanipore', 'Ballygunge', 'Alipore', 'New Town'] },
      'howrah': { name: 'Howrah', villages: ['Shibpur', 'Liluah', 'Panchla', 'Amta'] },
      'hooghly': { name: 'Hooghly', villages: ['Chinsurah', 'Serampore', 'Rishra', 'Goghat'] },
      'bankura': { name: 'Bankura', villages: ['Bankura Town', 'Bishnupur', 'Khatra', 'Vishnupur'] },
      'barddhaman': { name: 'Barddhaman', villages: ['Barddhaman', 'Asansol', 'Durgapur', 'Pandaveswar'] },
      'birbhum': { name: 'Birbhum', villages: ['Bolpur', 'Suri', 'Rampurhat', 'Nalhati'] },
      'darjeeling': { name: 'Darjeeling', villages: ['Darjeeling', 'Kalimpong', 'Kurseong', 'Siliguri'] },
    }
  },
  'assam': {
    name: 'Assam',
    districts: {
      'kamrup': { name: 'Kamrup', villages: ['Guwahati', 'Narengi', 'Nalbari', 'Rangia'] },
      'guwahati': { name: 'Guwahati', villages: ['Guwahati City', 'Dispur', 'Uzanbazar', 'Paltan Bazaar'] },
      'barpeta': { name: 'Barpeta', villages: ['Barpeta', 'Goalpara', 'Mankachar', 'Sarthebari'] },
      'dhubri': { name: 'Dhubri', villages: ['Dhubri', 'Phulbari', 'Bilasipara', 'Golakganj'] },
      'silchar': { name: 'Silchar', villages: ['Silchar', 'Katlicherra', 'Udharbond', 'Bethkuchi'] },
      'cachar': { name: 'Cachar', villages: ['Silchar', 'Lakhipur', 'Dima Hasao', 'Karimganj'] },
    }
  },
  'tripura': {
    name: 'Tripura',
    districts: {
      'agartala': { name: 'West Tripura', villages: ['Agartala', 'Sadar', 'Mohanpur', 'Ambassa'] },
      'udaipur': { name: 'Gomti', villages: ['Udaipur', 'Amarpur', 'Sabroom', 'Neermahal'] },
      'kailasahar': { name: 'Unakoti', villages: ['Kailasahar', 'Dharmanagar', 'Teliamura', 'Panisagar'] },
    }
  },
  'odisha': {
    name: 'Odisha',
    districts: {
      'bhubaneswar': { name: 'Khordha', villages: ['Bhubaneswar', 'Cuttack', 'Paradip', 'Puri'] },
      'cuttack': { name: 'Cuttack', villages: ['Cuttack', 'Jagatsinghpur', 'Paradip', 'Puri'] },
      'puri': { name: 'Puri', villages: ['Puri', 'Pipli', 'Chakra', 'Daya'] },
      'balangir': { name: 'Balangir', villages: ['Balangir', 'Bijepur', 'Titilagarh', 'Loisingha'] },
      'sambalpur': { name: 'Sambalpur', villages: ['Sambalpur', 'Deogarh', 'Sonepur', 'Rourkela'] },
      'rourkela': { name: 'Sundargarh', villages: ['Rourkela', 'Jamshedpur', 'Rajgangpur', 'Barbil'] },
    }
  },
}

export const states = Object.entries(statesDistricts).map(([key, val]) => ({
  code: key,
  name: val.name,
}))

export const getDistricts = (stateCode) => {
  const state = statesDistricts[stateCode]
  if (!state) return []
  return Object.entries(state.districts).map(([key, val]) => ({
    code: key,
    name: val.name,
  }))
}

export const getVillages = (stateCode, districtCode) => {
  const state = statesDistricts[stateCode]
  if (!state) return []
  const district = state.districts[districtCode]
  if (!district) return []
  return district.villages
}
