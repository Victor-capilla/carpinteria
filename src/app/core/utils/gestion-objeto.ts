export class GestionObjeto {
 
    static deepCopy<T>(obj: T): T {
        return GestionObjeto._deepCopyRec(obj);
      }
    
      private static _deepCopyRec<T>(obj: T): T {
        if (obj === null || typeof obj !== 'object') return obj;
    
        if (Array.isArray(obj)) {
          return obj.map((item) => GestionObjeto._deepCopyRec(item)) as T;
        }
    
        const result: any = {};
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = GestionObjeto._deepCopyRec(obj[key]);
          }
        }
        return result;
      }

      static deepAssign<T extends Record<string, any>>(target: T, source: Partial<T>): T {
        for (const key in source) {
          if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
    
          const sourceValue = source[key];
          const targetValue = target[key];
    
          if (
            GestionObjeto.isPlainObject(sourceValue) &&
            GestionObjeto.isPlainObject(targetValue)
          ) {
            GestionObjeto.deepAssign(targetValue, sourceValue as any);
          } else {
            target[key] = sourceValue as T[Extract<keyof T, string>];
          }
        }
    
        return target;
      }

      private static isPlainObject(value: any): value is Record<string, any> {
        return (
          value !== null &&
          typeof value === 'object' &&
          !Array.isArray(value) &&
          !(value instanceof Date)
        );
      }
}