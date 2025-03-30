# 10labsCarpinteria

## Estructura del Proyecto

He decidido seguir una estructura basada en los principios de la **arquitectura hexagonal (Puertos y Adaptadores)** y **DDD (Domain-Driven Design)**. Aunque es una aplicación pequeña, quería demostrar que siguiendo estos principios es fácil aislar la lógica de negocio y mantener independencia del framework. Esto permite que sea mucho más escalable para futuras implementaciones.

## Organización de Carpetas

### 📂 **Shared**

Para componentes, servicios, pipes y elementos que se comparten en toda la aplicación.

- Aquí tengo los componentes que forman el layout.
- Archivo para gestionar copias profundas (`utils`).

### 📂 **Core**

Aquí gestiono la infraestructura general de la aplicación, como:

- Login.
- Capturas de errores centralizadas.

### 📂 **Features**

Aquí es donde implemento los módulos funcionales de la aplicación. Dentro de `features` sigo una estructura basada en Arquitectura Hexagonal y DDD. Por cada módulo funcional tengo la siguiente estructura de carpetas:

#### 📁 **Domain**

- Interfaces y entidades con su lógica de negocio.
- Aquí establezco los contratos para aplicar después inversión de dependencias con la capa de infraestructura.

#### 📁 **Application**

- Casos de uso concretos (por ejemplo, obtener módulos, modificarlos, etc.).
- Casos de uso con lógica de negocio específica.
- Mappers para la transformación de datos entre capas.

#### 📁 **Infrastructure**

- Implementaciones concretas de los contratos definidos en la capa de dominio.
- Por ejemplo, obtener módulos a través de una API REST.

#### 📁 **UI**

- Componentes visuales específicos del módulo.
- Todo lo relacionado con la visualización y presentación.

#### 📁 **Routing**

- Definición de las rutas específicas del módulo.

#### 📁 **Module**

- Organización y empaquetado de servicios, componentes y dependencias del módulo en una unidad funcional.

---

## ⚙️ Decisiones para el desarrollo y la escalabilidad del proyecto

- **Gestión de Clientes**: La gestión de clientes era sencilla, ya que solo había que definir la entidad con sus proyectos asociados y añadir los casos de uso de crear, actualizar, borrar y obtener.

- **Gestión de Módulos**: La parte más difícil de hacer escalable era la de módulos, ya que cada tipo tiene propiedades distintas y su propia lógica. He optado por:

  - En los componentes de creación y actualización de proyecto, he añadido una clase (`ProyectoFormConfig.getConfigFormByModule`) que provee el fragmento de formulario específico para cada tipo de módulo, con validaciones.

  - Una vez creado el formulario, utilizo un servicio (`ModuleFactoryUseCase`) que genera la entidad por módulo. Este servicio llama a casos de uso específicos para crear piezas según las dimensiones (como `AddPiezasEstanteriaUseCase` y `AddPiezasEncimeraUseCase`). Finalmente, los módulos generados se añaden al repositorio mediante `createProyectoUseCase` y `updateProyectoUseCase`.

Lo ideal para lograr una escalabilidad completa habría sido crear un motor de reglas para generar módulos y piezas asociadas, pero eso habría sido demasiado costoso en términos de tiempo.

---

## 🛠️ Tecnologías Usadas

- Angular 19
- PrimeNG
- ESLint

---

## 🚀 Cómo Ejecutar el Proyecto

### ✅ Instalación de Requisitos

- Instalar Node.js desde [nodejs.org](https://nodejs.org)

- Si tienes Angular CLI instalado, desinstálalo primero:
```bash
npm uninstall -g @angular/cli
npm cache clean --force
npm install -g @angular/cli@19
```
### 📦 Instalación de dependencias
```bash
npm install
```
### 🖥️ Arranque
```bash
ng serve
http://localhost:4200
```

## ⚡ Ejecutar el proyecto desde StackBlitz

Si quieres ejecutar la aplicación rápidamente sin necesidad de instalar nada en tu ordenador, puedes hacerlo directamente desde StackBlitz:

[🚀 Abrir el proyecto en StackBlitz](https://stackblitz.com/github/Victor-capilla/carpinteria)

StackBlitz se encargará automáticamente de instalar las dependencias y ejecutar el proyecto para que puedas verlo inmediatamente en tu navegador.
