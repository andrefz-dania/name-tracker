export function evaluateColumn(column) {
      if (
        column == 'species' ||
        column == 'gender' ||
        column == 'location' ||
        column == 'occupation'
      ) {
        return column
      } else if (column == 'status') {
        return 'dead'
      } else {
        return 'name'
      }
    }

function extractNumbers(versionString) {
    const vMajor = parseInt(versionString.split('.')[0])
    const vMinor = parseInt(versionString.split('.')[1])
    const vPatch = parseInt(versionString.split('.')[2])
    const version = vMajor * 10000 + vMinor * 100 + vPatch;
    // 1.6.2 = 10602
    // 11.33.12 = 113312
    return version
}

export function isNewerVersion(appVer, dbVer) {
    // extract each version number from version string
    

    const app = extractNumbers(appVer);
    const db = extractNumbers(dbVer);

    if (app > db) {
        return true
    } else {
        return false
    }
}