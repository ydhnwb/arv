import { container } from "tsyringe";
import { provideRepositoryModule } from "./repository.module";
import { provideUseCaseModule } from "./usecase.module";


function registerDependencies(){
    provideRepositoryModule();
    provideUseCaseModule();
}

export { registerDependencies, container }