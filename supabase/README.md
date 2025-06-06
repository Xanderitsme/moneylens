# Configuración de Base de Datos en Supabase

Este directorio contiene todos los archivos SQL necesarios para configurar la base de datos del proyecto de gestión financiera. Los archivos deben ejecutarse en un orden específico para garantizar una configuración correcta.

## Orden de Ejecución

### 1. schema.sql

- Define la estructura base de la base de datos
- Crea los tipos ENUM necesarios (`categories_type`, `transactions_type`)
- Crea las tablas principales (`wallets`, `categories`, `transactions`)
- Establece las relaciones y restricciones entre tablas
- Crea los índices necesarios para optimizar las consultas

### 2. functions.sql

- Define las funciones que serán utilizadas por los triggers
- Incluye:
  - `update_updated_at_column`: Actualiza la marca de tiempo de última modificación
  - `update_wallet_balance`: Mantiene actualizados los totales de ingresos y gastos
  - `soft_delete_category`: Maneja el borrado lógico de categorías

### 3. triggers.sql

- Configura los triggers que automatizan operaciones en la base de datos
- Conecta las funciones definidas con eventos de las tablas
- Asegura la integridad y consistencia de los datos

### 4. policies.sql

- Establece las políticas de Row Level Security (RLS)
- Define los permisos de acceso para cada tabla
- Asegura que los usuarios solo puedan acceder a sus propios datos

## Procedimiento de Implementación

1. Conéctate a tu proyecto de Supabase
2. Abre el Editor SQL
3. Ejecuta los archivos en el siguiente orden:

   ```sql
   -- 1. Crear estructura de base de datos
   \i schema.sql

   -- 2. Crear funciones necesarias
   \i functions.sql

   -- 3. Configurar triggers
   \i triggers.sql

   -- 4. Establecer políticas de seguridad
   \i policies.sql
   ```

## Notas Importantes

- Asegúrate de que no haya errores en cada paso antes de continuar con el siguiente
- Las políticas de RLS deben ser las últimas en configurarse
- Si necesitas revertir cambios, hazlo en orden inverso
- Mantén un backup de la base de datos antes de realizar cambios significativos

## Verificación

Después de la implementación, verifica:

1. La estructura de las tablas está correcta
2. Los triggers funcionan como se espera
3. Las políticas RLS están activas y funcionando
4. Los usuarios solo pueden acceder a sus propios datos
