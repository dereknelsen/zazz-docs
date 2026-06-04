import "server-only";
import type { ComponentType } from "react";
import AccordionDefault from "@/components/preview-examples/accordion-default";
import AvatarAuthor from "@/components/preview-examples/avatar-author";
import AvatarWithImage from "@/components/preview-examples/avatar-with-image";
import AvatarWithInitials from "@/components/preview-examples/avatar-with-initials";
import BadgeMinimal from "@/components/preview-examples/badge-minimal";
import BadgeVariants from "@/components/preview-examples/badge-variants";
import ButtonMinimal from "@/components/preview-examples/button-minimal";
import ButtonVariants from "@/components/preview-examples/button-variants";
import ButtonWithIcons from "@/components/preview-examples/button-with-icons";
import CardBasic from "@/components/preview-examples/card-basic";
import CheckboxDefault from "@/components/preview-examples/checkbox-default";
import DropdownDefault from "@/components/preview-examples/dropdown-default";
import InputDefault from "@/components/preview-examples/input-default";
import InputIconLeading from "@/components/preview-examples/input-icon-leading";
import InputIconTrailing from "@/components/preview-examples/input-icon-trailing";
import NavigationMenuDefault from "@/components/preview-examples/navigation-menu-default";
import PasswordGroupDefault from "@/components/preview-examples/password-group-default";
import RadioGroup from "@/components/preview-examples/radio-group";
import SelectDefault from "@/components/preview-examples/select-default";
import SliderDefault from "@/components/preview-examples/slider-default";
import SwitchDefault from "@/components/preview-examples/switch-default";
import TabsDefault from "@/components/preview-examples/tabs-default";
import TextareaDefault from "@/components/preview-examples/textarea-default";

export type PreviewName = keyof typeof previewRegistry;

export const previewRegistry: Record<string, ComponentType> = {
  "accordion-default": AccordionDefault,
  "avatar-author": AvatarAuthor,
  "avatar-with-image": AvatarWithImage,
  "avatar-with-initials": AvatarWithInitials,
  "badge-minimal": BadgeMinimal,
  "badge-variants": BadgeVariants,
  "button-minimal": ButtonMinimal,
  "button-variants": ButtonVariants,
  "button-with-icons": ButtonWithIcons,
  "card-basic": CardBasic,
  "checkbox-default": CheckboxDefault,
  "dropdown-default": DropdownDefault,
  "input-default": InputDefault,
  "input-icon-leading": InputIconLeading,
  "input-icon-trailing": InputIconTrailing,
  "navigation-menu-default": NavigationMenuDefault,
  "password-group-default": PasswordGroupDefault,
  "radio-group": RadioGroup,
  "select-default": SelectDefault,
  "slider-default": SliderDefault,
  "switch-default": SwitchDefault,
  "tabs-default": TabsDefault,
  "textarea-default": TextareaDefault,
};
