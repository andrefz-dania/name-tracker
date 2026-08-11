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