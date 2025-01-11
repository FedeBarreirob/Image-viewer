# Visualizador de Imágenes

Esta aplicación permite visualizar un listado de imágenes, agregar imágenes a una lista de favoritos, eliminarlas, iniciar sesión (sin registro), ver detalles individuales y descargarlas. Es una solución moderna y eficiente, diseñada para ofrecer una experiencia rápida y fluida.

---

## 🚀 **Características**

- **Listado de imágenes**: Visualiza un catálogo infinito de imágenes.
- **Favoritos**: Agrega imágenes a tu lista de favoritos o elimínalas cuando ya no las necesites.
- **Detalles**: Haz clic en una imagen para ver más información.
- **Descargas**: Descarga las imágenes directamente a tu dispositivo.
- **Sesión**: Inicia sesión para personalizar tu experiencia (no requiere registro).

---

## 🛠️ **Tecnologías Utilizadas**

- **React**
- **React Router**
- **Vite**
- **Zustand**
- **React Query**
- **Radix UI**
- **TypeScript**

---

## ⚡ **Instalación y Configuración**

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/FedeBarreirob/Image-viewer.git
   cd image-viewer
   ```
2. **Instalar dependencias**:
   npm install
3. **Iniciar el servidor de desarrollo**:
   npm run dev
4. **Abrir en navegador**:
   Por defecto, la aplicación estará disponible en http://localhost:5173.

## **Estructura del proyecto**
src/
├── components/     # Componentes reutilizables
├── helpers/        # Utilidades para funciones especificas
├── interfaces/     # Tipos de datos definidos para objetos con Typescript
├── hooks/          # Hooks personalizados
├── pages/          # Páginas principales (Inicio, Favoritos, Detalle)
├── store/          # Gestión de estado global con Zustand
├── App.tsx         # Configuración principal de la aplicación
└── main.tsx        # Entrada principal de Vite