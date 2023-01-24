import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components

import { HomeComponent } from "./components/home/home.component";
import { CreateComponent } from "./components/create/create.component";
import { DetailComponent } from "./components/detail/detail.component";
import { EditComponent } from "./components/edit/edit.component";
import { ProductsComponent } from "./components/products/products.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "crear-producto", component: CreateComponent },
    { path: "producto/:id", component: DetailComponent },
    { path: "editar-producto/:id", component: EditComponent },
    { path: "productos", component: ProductsComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "**", component: HomeComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);