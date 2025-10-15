# Folder-Based In-Place Refactor & Naming Prompt

You are assisting me in refactoring a large JSX project.
Here’s the context and instructions before you begin:

---

## 1️⃣ Refactor Strategy

For each file in the specified folder (and its subfolders), isolate inline components in place at the top of the file.
Replace all inline occurrences with the newly extracted local components.
Label each extracted component with a comment indicating its eventual destination folder (primitives, blocks, layouts, or icons).
Focus strictly on primitives, blocks, layouts, and icons. Ignore any other content not related to these.

---

## 2️⃣ Final Folder Structure for Reference

```
components/
  ├─ icons/
  ├─ charts/
  ├─ primitives/
  ├─ blocks/
  └─ layout/
```

**Component type context for decision-making:**

* **Primitives:** Small, reusable UI components such as buttons, inputs, text fields, checkboxes, and other low-level building blocks.
* **Blocks:** Composed UI components built from primitives, like cards, tables, modals, or grouped widgets.
* **Layouts:** High-level structures defining page or section layouts, usually composed of blocks and primitives (e.g., forms, dashboards, grids).
* **Icons:** SVGs or small visual elements used across the UI; some may not yet exist in the root icons folder and will need comments for eventual placement.
* **Charts:** Visual chart components (e.g., bar, line, pie charts) — treat them as their own category if found.

---

## 3️⃣ Naming Conventions

Names must be generic and behavioral, not tied to the view context.
Only create a new variant if the component differs behaviorally, not just visually.

**Examples for text fields:**

```
TextField          → base version
TextField_Icon     → adds icon behavior
TextField_Password → hides input text
TextField_Icon_Password → combination of icon + password behavior
```

**Do not name components based on the view:**

```
❌ SearchTextField
❌ AuthTextField
❌ SettingsTextField
```

---

## 4️⃣ Centralized Naming Registry

Maintain a full updated registry including all previously agreed names plus any new ones.
For each generic name, include a list of all relevant paths/files where that component occurs.
Use existing names from this list whenever possible.
Only propose a new name if there is no suitable match.

### ✅ **Current Naming Registry**
| Component Name              | File Paths                                                                                                                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TextField`                 | `src/features/portals/training/components/modals/CRUDModal.jsx`                                                                                                                                                                             |
| `TextField_Icon`            | `src/features/authentication/LoginPage.jsx`<br>`src/features/authentication/SignupPage.jsx`                                                                                                                                                 |
| `TextField_Password`        | *(Existing generic primitive — not yet used)*                                                                                                                                                                                               |
| `TextField_Icon_Password`   | `src/features/authentication/LoginPage.jsx`<br>`src/features/authentication/SignupPage.jsx`                                                                                                                                                 |
| `SelectField`               | `src/features/portals/training/components/modals/CRUDModal.jsx`                                                                                                                                                                             |
| `Button`                    | `src/features/authentication/LoginPage.jsx`<br>`src/features/authentication/SignupPage.jsx`<br>`src/features/portals/training/components/modals/ConfirmationModal.jsx`<br>`src/features/portals/training/components/modals/DeleteModal.jsx` |
| `Button_Icon`               | `src/features/settings/index.jsx`                                                                                                                                                                                                           |
| `Button_Icon_Destructive`   | `src/features/settings/index.jsx`<br>`src/features/portals/training/components/modals/CertificatePreviewModal.jsx`                                                                                                                          |
| `Button_Destructive`        | `src/features/portals/training/components/modals/ConfirmationModal.jsx`<br>`src/features/portals/training/components/modals/DeleteModal.jsx`                                                                                                |
| `Button_Subtle`             | `src/features/portals/training/components/modals/ConfirmationModal.jsx`<br>`src/features/portals/training/components/modals/DeleteModal.jsx`                                                                                                |
| `Header_Subtitle`           | `src/features/authentication/LoginPage.jsx`<br>`src/features/authentication/SignupPage.jsx`<br>`src/features/settings/index.jsx`                                                                                                            |
| `Footer_TextLink`           | `src/features/authentication/LoginPage.jsx`<br>`src/features/authentication/SignupPage.jsx`                                                                                                                                                 |
| `AuthLayout`                | `src/features/authentication/index.jsx`                                                                                                                                                                                                     |
| `SettingsLayout`            | `src/features/settings/index.jsx`                                                                                                                                                                                                           |
| `ModalLayout`               | `src/features/portals/training/components/modals/CRUDModal.jsx`<br>`src/features/portals/training/components/modals/CertificatePreviewModal.jsx`                                                                                            |
| `ModalLayout_Confirmations` | `src/features/portals/training/components/modals/ConfirmationModal.jsx`<br>`src/features/portals/training/components/modals/DeleteModal.jsx`                                                                                                |
| `DetailsFormLayout`         | `src/features/portals/training/components/modals/CRUDModal.jsx`                                                                                                                                                                             |
| `BrandBlock`                | `src/features/authentication/index.jsx`                                                                                                                                                                                                     |
| `ListItem`                  | `src/features/settings/index.jsx`<br>`src/features/portals/training/components/modals/CRUDModal.jsx`                                                                                                                                        |
| `Toggle_Icon`               | `src/features/settings/index.jsx`                                                                                                                                                                                                           |
| `Section`                   | `src/features/portals/training/components/modals/CRUDModal.jsx`                                                                                                                                                                             |
| `EmployeeCreateBlock`       | `src/features/portals/training/components/modals/CRUDModal.jsx`                                                                                                                                                                             |
| `EmployeeSearchBlock`       | `src/features/portals/training/components/modals/CRUDModal.jsx`                                                                                                                                                                             |
| `EmployeeSelectorBlock`     | `src/features/portals/training/components/modals/CRUDModal.jsx`                                                                                                                                                                             |
| `DetailsBlock`              | `src/features/portals/training/components/modals/CRUDModal.jsx`                                                                                                                                                                             |
| `ExpiryValidityBlock`       | `src/features/portals/training/components/modals/CRUDModal.jsx`                                                                                                                                                                             |
| `FilePreviewer`             | `src/features/portals/training/components/modals/CertificatePreviewModal.jsx`                                                                                                                                                               |
| `ModalBlock_Confirmations`  | `src/features/portals/training/components/modals/ConfirmationModal.jsx`<br>`src/features/portals/training/components/modals/DeleteModal.jsx`                                                                                                |
| `CloseIcon`                 | `src/features/portals/training/components/modals/CRUDModal.jsx`<br>`src/features/portals/training/components/modals/CertificatePreviewModal.jsx`                                                                                            |
| `TrashIcon`                 | `src/features/portals/training/components/modals/CertificatePreviewModal.jsx`                                                                                                                                                               |
| `WarningIcon`               | `src/features/portals/training/components/modals/ConfirmationModal.jsx`<br>`src/features/portals/training/components/modals/DeleteModal.jsx`                                                                                                |

---

## 5️⃣ In-Place Refactor Requirements

For each file in the specified folder (and its subfolders):

* Identify inline JSX UI chunks that can become components.
* Extract them as local components at the top of the file.
* Name them according to the current registry, or propose a new generic name if needed.
* Label each extracted component with a destination comment:

  ```jsx
  // primitive: ComponentName
  // block: ComponentName
  // layout: ComponentName
  // icon: ComponentName
  ```
* Replace all inline occurrences in the file with the new local component.
* Consolidate similar elements into variants, ensuring that behaviorally distinct variants are always separated even if visually similar.

---

## 6️⃣ Checklist & Output Requirements

Provide refactored code for all files in the folder.
Output a list of all extracted components and their destination types.
Output a full updated generic naming registry, including for each name:

* The generic component name
* A list of all file paths where it appears
  Maintain functionality and formatting as-is.

---

## 7️⃣ Folder to Process

```
src/features/portals/training/components/ui
```

You should strictly focus on this folder.

---

## 8️⃣ Use Existing Naming Registry as a Guide:
Look at the current naming registry, which lists all components we’ve already extracted from other folders. Use this as a reference to identify components in the new folder that should also be decoupled. Only create new generic names for components that aren’t already in the registry. This keeps names consistent and avoids unnecessary duplicates.
You must have a look at src/features/portals/training/components/modals/CRUDModal.jsx for inpiration; I want nothing less that it.