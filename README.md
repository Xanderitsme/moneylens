# MoneyLens 🔍

MoneyLens es una aplicación moderna de gestión financiera personal que te permite tener una visión clara y detallada de tus finanzas. Organiza tus ingresos y gastos en diferentes billeteras, categoriza tus transacciones y mantén el control total de tu dinero.

## ✨ Características

- 💰 **Múltiples Billeteras**: Organiza tu dinero en diferentes billeteras (efectivo, cuentas bancarias, ahorros, etc.)
- 📊 **Categorización**: Clasifica tus ingresos y gastos con un sistema flexible de categorías
- 🔒 **Seguridad**: Implementación robusta de autenticación y políticas de seguridad con Supabase
- 📱 **Diseño Responsivo**: Interfaz moderna y adaptable a cualquier dispositivo
- 🔄 **Historial Completo**: Mantén un registro detallado de todas tus transacciones

## 🚀 Tecnologías

- **Frontend**: SolidJS + TypeScript + TailwindCSS + Vite
- **Backend**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth

## 📦 Instalación

1. Clona el repositorio:

   ```bash
   git clone <https://github.com/tu-usuario/moneylens.git>
   cd moneylens
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Configura las variables de entorno:

   ```bash
   cp .env.example .env
   ```

   Edita el archivo .env con tus credenciales de Supabase.

4. Inicia el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

## 🗄️ Estructura de la Base de Datos

La aplicación utiliza tres tablas principales:

- **wallets**: Almacena las billeteras del usuario con sus saldos
  - Tracking de ingresos y gastos totales
  - Saldos calculados automáticamente
  - Relación directa con el usuario

- **categories**: Gestiona las categorías para clasificar transacciones
  - Sistema flexible de tipos (ingreso, gasto, ambos)
  - Borrado lógico para mantener historial
  - Nombres únicos por usuario

- **transactions**: Registra todas las transacciones con sus detalles
  - Montos y fechas precisas
  - Categorización obligatoria
  - Referencias a billetera y categoría

Para más detalles sobre la estructura, funciones y políticas de seguridad, consulta la [documentación técnica](./supabase/README.md) en el directorio `supabase`.

## 🔑 Configuración de Supabase

1. Crea un nuevo proyecto en [Supabase](https://supabase.com)

2. Configura la base de datos siguiendo la guía detallada en [`supabase/README.md`](./supabase/README.md). El proceso incluye:
   - Creación de tablas y tipos ENUM
   - Configuración de funciones y triggers
   - Implementación de políticas de seguridad (RLS)

3. Obtén las credenciales del proyecto:
   - Ve a Project Settings > API
   - Copia `Project URL` y `anon public key`
   - Configura estas credenciales en tu archivo `.env`:

     ```bash
     VITE_SUPABASE_URL=tu-project-url
     VITE_SUPABASE_ANON_KEY=tu-anon-key
     ```

4. Verifica la configuración:
   - Asegúrate de que las políticas RLS estén activas
   - Prueba la creación de un usuario
   - Verifica que las restricciones de acceso funcionen correctamente
