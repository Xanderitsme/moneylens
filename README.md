# MoneyLens 🔍

MoneyLens es una aplicación moderna de gestión financiera personal que te permite tener una visión clara y detallada de tus finanzas. Organiza tus ingresos y gastos en diferentes billeteras, categoriza tus transacciones y mantén el control total de tu dinero.

## ✨ Características

- 💰 **Múltiples Billeteras**: Organiza tu dinero en diferentes billeteras (efectivo, cuentas bancarias, ahorros, etc.)
- 📊 **Categorización**: Clasifica tus ingresos y gastos con un sistema flexible de categorías
- 🔒 **Seguridad**: Implementación robusta de autenticación y políticas de seguridad con Supabase
- 📱 **Diseño Responsivo**: Interfaz moderna y adaptable a cualquier dispositivo
- 🎯 **Balance en Tiempo Real**: Seguimiento automático de saldos en cada billetera
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
- **categories**: Gestiona las categorías para clasificar transacciones
- **transactions**: Registra todas las transacciones con sus detalles

Características de seguridad:

- Row Level Security (RLS)
- Soft Delete para categorías
- Triggers para actualización automática de saldos
- Auditoría de cambios en transacciones

## 🔑 Configuración de Supabase

1. Crea un proyecto en Supabase
2. Ejecuta el script SQL provisto en `supabase/main.sql`
3. Configura las políticas de seguridad (RLS)
4. Obtén las credenciales de API y configúralas en tu .env
