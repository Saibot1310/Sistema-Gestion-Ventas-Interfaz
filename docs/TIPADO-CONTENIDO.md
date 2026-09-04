# Etapa TypeScript

## Módulo 1: Introducción a TypeScript
### Temas
- Qué es TypeScript
- TypeScript vs JavaScript
- Tipado estático y dinámico
- Errores detectables antes de ejecutar
- Compilación y transpilación
- Código fuente TypeScript y código JavaScript generado
- Compatibilidad con JavaScript
- Cuándo usar TypeScript

## Módulo 2: Configuración del entorno
### Temas
- Instalación de TypeScript
- TypeScript Compiler
- tsc
- npm
- package.json
- Archivos .ts
- Compilación
- Directorio de salida
- tsconfig.json
- Opciones fundamentales
- target, module, rootDir, outDir, strict, sourceMap, include, exclude
- Desarrollo vs producción

## Módulo 3: Tipos básicos
### Temas
- string, number, boolean
- bigint, symbol, null, undefined
- Arrays y tuplas
- Objetos
- Tipado explícito
- Inferencia de tipos
- Cuando declarar tipos explícitamente
- Cuando confiar en la inferencia

## Módulo 4: Variables, objetos y estructuras de datos
### Temas
- Tipado de variables
- Tipado de objetos
- Propiedades opcionales
- readonly
- Array tipados
- Array de objetos
- Tuplas
- Objetos anidados
- Inferencia estructural
- Structural typing

## Módulo 5: Funciones
### Temas
- Tipado de parámetros
- Valores de retorno
- Funciones que no retornan valores
- void
- Funciones opcionales
- Parámetros opcionales
- Parámetros por defecto
- Rest parameters
- Funciones flecha
- Callbacks tipados
- Funciones como tipos
- Signatura de funciones

## Módulo 6: Type aliases e interfaces
### Temas
- type
- interfaces
- Diferencias entre type e interface
- Extender interfaces
- Intersección de tipos
- Reutilización de contratos
- Modelado de entidades
- Contratos de dominio
- Cuándo utilizar cada mecanismo

## Módulo 7: Union, literal e intersection types
### Temas
- Union types
- Literal types
- Intersection types
- Discriminated unions
- Estados
- Variantes de entidades
- Modelado de estados de negocio

## Módulo 8: Narrowing y type guards
### Temas
- Type narrowing
- typeof
- instanceof
- in
- Equality narrowing
- Type predicates
- Type guards personalizados
- Discriminated unions
- Control flow analysis
- Manejo seguro de tipos

## Módulo 9: null, undefined y seguridad de tipos
### Temas
- strictNullChecks
- null y undefined
- Optional properties
- Optional chaining
- Nullish coalescing
- Non-null assertion operator
- Problemas de asumir que un valor existe
- Diseño de APIs seguras

## Módulo 10: any, unknown y never
### Temas
- any
- Problemas de any
- Implicit any
- unknown
- Diferencias entre any y unknown
- Narrowing de unknown
- never
- Exhaustiveness checking
- Uso responsable de tipos especiales

## Módulo 11: Enums y alternativas
### Temas
- Enums
- Numeric enums
- String enums
- Const enums
- Ventajas y desventajas de enums
- Alternativas mediante union types
- Cuándo utilizar enums
- Cuándo preferir literal unions

## Módulo 12: Generics
### Temas
- Generic functions
- Generic interfaces
- Generic types
- Type parameters
- Constraints
- keyof
- Generic collections
- Reutilización de código
- Type safety

## Módulo 13: Utility types
### Temas
- Partial
- Required
- Readonly
- Pick
- Omit
- Record
- Exclude
- Extract
- NonNullable
- ReturnType
- Parameters
- Awaited
- Composición de utility types

## Módulo 14: Type manipulation
### Temas
- keyof
- typeof en tipos
- Indexed access types
- Mapped types
- Conditional types
- Template literal types
- Infer
- Introducción a tipos avanzados
- Cuándo utilizar tipos complejos

## Módulo 15: Módulos y organización
### Temas
- Import y export
- type-only imports y exports
- Organización de módulos
- Tipos compartidos
- Separación de dominio
- Separación de interfaz
- Utilidades
- Dependencias
- Arquitectura modular

## Módulo 16: TypeScript y DOM
### Temas
- Document
- Element
- HTMLElement
- HTMLInputElement, HTMLButtonElement, HTMLFormElement
- querySelector y tipos
- getElementById
- Type assertions
- Type guards
- Eventos tipados
- Event
- MouseEvent, KeyboardEvent, SubmitEvent
- Formularios
- Elementos posiblemente null

## Módulo 17: TypeScript y APIs
### Temas
- Fetch API
- Promise
- JSON
- Tipado de respuestas
- Interfaces para datos externos
- Validación de datos externos
- Datos no confiables
- unknown
- Transformación de datos
- DTOs conceptualmente
- Separación entre datos externos y dominio

## Módulo 18: TypeScript y asíncronía
### Temas
- Promise<T>
- async/await
- Tipado de funciones asíncronas
- Errores
- try/catch
- Resultados opcionales
- Datos posiblmente inexistentes
- Composición de funciones asíncronas

## Módulo 19: Arquitectura y TypeScript
### Temas
- TypeScript como herramienta arquitectónica
- Contratos
- Interfaces
- Separación de responsabilidades
- Dominio, aplicación e infraestructura
- Tipos de dominio
- Tipos de presentación
- Tipos externos
- Dependencias
- Inversión de dependencias
- Diseño mantenible