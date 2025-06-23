export function formatNumberWithCommas(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatNumberWithOneDecimal(number: number | null): string {
    if (number === null || number === undefined) {
        return "0.0";
    }
    return number.toFixed(1);
}

export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function formatNumber(number: number): string {
    if (!Number.isFinite(number)) {
        return "0.0";
    }

    const formattedNumber = number.toFixed(1);
    return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// utils/productUtils.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseProductFeatures = (features: any): string[] => {
    if (!features) return [];
    if (Array.isArray(features)) return features.filter(f => typeof f === 'string');
    
    try {
      // Handle case where features might be a stringified array
      const parsed = typeof features === 'string' ? JSON.parse(features) : features;
      return Array.isArray(parsed) 
        ? parsed.filter(f => typeof f === 'string')
        : [];
    } catch {
      return [];
    }
  };