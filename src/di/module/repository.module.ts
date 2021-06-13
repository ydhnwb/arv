import { container } from "tsyringe";
import { ProductRepositoryImpl } from "../../data/product/repo/product_repo_impl";
import { AppDependencies } from "../type";

export function provideRepositoryModule() {
    container.register(AppDependencies.ProductRepository, {
        useValue: new ProductRepositoryImpl()
    })
}