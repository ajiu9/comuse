import type { MaybeRefOrGetter, Ref, ShallowRef } from 'vue';
export interface UseToggleOptions<Truthy, Falsy> {
    truthyValue?: MaybeRefOrGetter<Truthy>;
    falsyValue?: MaybeRefOrGetter<Falsy>;
}
export declare function useToggle<Truthy, Falsy, T = Truthy | Falsy>(initialValue: Ref<T>, options?: UseToggleOptions<Truthy, Falsy>): (value?: T) => T;
export declare function useToggle<Truthy = true, Falsy = false, T = Truthy | Falsy>(initialValue?: T, options?: UseToggleOptions<Truthy, Falsy>): [ShallowRef<T>, (value?: T) => T];
