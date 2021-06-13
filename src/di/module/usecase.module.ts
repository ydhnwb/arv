import { container } from "tsyringe";
import { GetAllProductUseCase } from "../../domain/product/usecase/get_all_product.usecase";
import { AppDependencies } from "../type";

export function provideUseCaseModule(){
    container.register(AppDependencies.GetAllProductUseCase, {
        useValue: GetAllProductUseCase
    })
}