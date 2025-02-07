# Propuesta de Micro frontend con Native Federation
Native Federation con Angular, Tailwind, etc.

# 📌 Documentación Detallada sobre Microfrontends con Native Federation

## 1️⃣ **Conceptos Clave**
### 🔹 **Microfrontends**
Los **Microfrontends** son una estrategia de arquitectura en la que una aplicación frontend grande se divide en módulos más pequeños y autónomos que pueden desarrollarse, desplegarse y escalarse de manera independiente.

### 🔹 **Native Federation**
**Native Federation** es una solución moderna para implementar **Microfrontends** sin depender de Webpack. Permite el consumo dinámico de módulos federados en diferentes bundlers como **Vite, ESBuild, Rollup** y **Parcel**.

### 🔹 **Monorepo vs Multirepo**
- **Monorepo**: Un solo repositorio que contiene todos los microfrontends y el shell.
- **Multirepo**: Cada microfrontend está en un repositorio independiente y se gestiona de forma autónoma.

---

## 2️⃣ **Comparación Monorepo vs Multirepo**

| Característica         | Monorepo ✅                        | Multirepo ✅                       |
|----------------------|--------------------------------|---------------------------------|
| **Gestión de Código** | Un solo repositorio, fácil de manejar. | Varios repositorios, más modularidad. |
| **Despliegue**       | Un solo pipeline de CI/CD.    | Cada microfrontend puede desplegarse independientemente. |
| **Escalabilidad**    | Más difícil de escalar con muchos equipos. | Escalabilidad óptima para múltiples equipos. |
| **Reutilización de Código** | Fácil con bibliotecas compartidas. | Requiere publicar paquetes o sincronización manual. |
| **Manejo de Dependencias** | Fácil de controlar con un solo `package.json`. | Puede generar inconsistencias entre versiones. |
| **Tiempo de Configuración** | Mayor al inicio, pero más fácil de mantener. | Menor al inicio, pero puede volverse complejo. |

---

## 3️⃣ **Flujo Detallado de Implementación (Gráfico)**

```mermaid
graph TD;
    A[SIAF RP (Shell Host)] -->|Carga dinámica| B[Login (React)];
    A -->|Carga dinámica| C[Tesorería (Angular)];
    A -->|Carga dinámica| D[Contabilidad (Angular)];
    A -->|Carga dinámica| E[Presupuesto (Angular)];
    A -->|Carga dinámica| F[UI (Navbar & Footer - Angular)];
```

![output](https://github.com/user-attachments/assets/9d56ed69-f541-4861-bedd-fcacdbf2bacc)


---

## 4️⃣ **Estructura de Carpetas para Multirepo**
### 📌 **Ejemplo con los MFE definidos:**
```
siaf-shell/              → Repositorio del Shell (Host)
siaf-mfe-login/          → Repositorio del MFE Login (React)
siaf-mfe-tesoreria/      → Repositorio del MFE Tesorería (Angular)
siaf-mfe-contabilidad/   → Repositorio del MFE Contabilidad (Angular)
siaf-mfe-presupuesto/    → Repositorio del MFE Presupuesto (Angular)
siaf-mfe-ui/             → Repositorio del MFE UI (Navbar, Footer en Angular)
```

![output (1)](https://github.com/user-attachments/assets/894a7263-614d-47fd-a4a2-d475d5dd5320)


### 📌 **Estructura interna del Shell (Host)**
```
siaf-shell/
│── src/
│   ├── app/
│   │   ├── routes.ts
│   │   ├── app.config.ts
│   │   ├── services/
│   │   │   ├── global-state.service.ts
│   ├── main.ts
│── federation.config.ts
│── package.json
│── angular.json
```

### 📌 **Estructura interna de un Microfrontend (Tesorería)**
```
siaf-mfe-tesoreria/
│── src/
│   ├── app/
│   │   ├── routes.ts
│   │   ├── tesoreria.component.ts
│── federation.config.ts
│── package.json
│── angular.json
```

---

## 5️⃣ **Implementación Paso a Paso**
### 🔹 **1. Instalación del Shell (Host)**
```bash
mkdir siaf-shell && cd siaf-shell
git init
ng new shell --standalone --routing --style=css
npm install @module-federation/native-federation
```
📌 **Configurar `federation.config.ts` en el Shell**
```typescript
import { defineFederationConfig } from "@module-federation/native-federation";

export default defineFederationConfig({
  name: "shell",
  remotes: {
    login: "http://localhost:4201/remoteEntry.json",
    tesoreria: "http://localhost:4202/remoteEntry.json",
    contabilidad: "http://localhost:4203/remoteEntry.json",
    presupuesto: "http://localhost:4204/remoteEntry.json",
    ui: "http://localhost:4205/remoteEntry.json"
  },
  shared: ["@angular/core", "@angular/common", "@angular/router"]
});
```

---

📌 **Conclusión**
🚀 Se ha implementado una estrategia de **Microfrontends con Native Federation** basada en **multirepo**, integrando manejo de estados con **Signals** y persistencia con **LocalStorage**. 

📌 **¿Próximos pasos?**
🔹 Configuración de CI/CD para despliegue independiente.  
🔹 Integración de autenticación JWT para los MFEs.  
🔹 Optimización de carga con `lazy loading`.  


