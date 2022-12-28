import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common/decorators";
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserDTO } from "./../users/dto/user.dto";


interface ClassConstructor {
    new (...args: any[]): {}
}
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any) { }

intercept(context: ExecutionContext, handler: CallHandler<any>)
: Observable<any> {
    /**
     * Run something before a request is handled by the request handler
     */
    return handler.handle().pipe(
        map((data: any) => {
            /**
             * Run something before the responseis sent out
             */
            return plainToClass(UserDTO, data, {
                excludeExtraneousValues: true
            })
        })
    )
}
}