import { Either } from 'fp-ts/lib/Either';
import { Observable } from 'rxjs';
import { Failure } from '../../common/base';
import { ProductEntity } from '../entity';

export interface ProductRepository {
    getAllProducts() : Observable<Either<Array<ProductEntity>, Failure>>;
}