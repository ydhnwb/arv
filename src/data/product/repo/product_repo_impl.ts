import { Either, left, right } from "fp-ts/lib/Either";
import { Observable, Observer } from "rxjs";
import { Failure } from "../../../domain/common/base";
import { ProductEntity } from "../../../domain/product/entity";
import { ProductRepository } from "../../../domain/product/repo";
import { ProductDataExample } from "../../common/data";

var json = require('../../common/data/product-mock-json.data.json');

export class ProductRepositoryImpl implements ProductRepository {
    // You can add more layer called data-source, but since this will get the mocked response,
    // i am not gonna do it.
    getAllProducts(): Observable<Either<Array<ProductEntity>, Failure>> {
        return new Observable((observer: Observer<Either<Array<ProductEntity>, Failure>>) => {
            const prods = json as ProductDataExample[];
            observer.next(left(prods));
            observer.complete();

            // if error, use this:
            // right(new Failure(-1, "error messge"))
            // consider to map the error first

            //if exception happens, please use observer.error(right(Failure....))
        });

    }

}