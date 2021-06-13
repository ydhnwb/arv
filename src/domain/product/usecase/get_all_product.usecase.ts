import { injectable, inject } from 'tsyringe';
import { ProductRepository } from '../repo';
import { Observable } from 'rxjs';
import { Failure } from '../../common/base';
import { ProductEntity } from '../entity';
import { Either, right } from 'fp-ts/lib/Either';
import { map } from 'rxjs/operators';


@injectable()
export class GetAllProductUseCase {
    constructor(
        @inject("ProductRepository")
        private productRepository: ProductRepository
    ){}

    getAllProducts() : Observable<Either<Array<ProductEntity>, Failure>> {
        return this.productRepository.getAllProducts();
    }
}