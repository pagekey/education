import bpy


class PAGEKEY_MyProperties(bpy.types.PropertyGroup):
    my_int: bpy.props.IntProperty()
    my_float: bpy.props.FloatProperty()
    my_string: bpy.props.StringProperty(description="Some string", maxlen=1024)
    my_bool: bpy.props.BoolProperty(name="Toggle Option")


class PAGEKEY_PT_PropertyGroupPanel(bpy.types.Panel):
    bl_idname = "PAGEKEY_PT_PropertyGroupPanel"
    
    bl_category = "PageKey"
    bl_label = "PropertyGroupPanel"
    bl_space_type = 'PROPERTIES'
    bl_region_type = 'WINDOW'
    bl_context = "object"

    def draw(self, context):
        self.layout.label(text="Enter values for the properties.")
        self.layout.prop(context.scene.pagekey_properties, "my_int")
        self.layout.prop(context.scene.pagekey_properties, "my_float")
        self.layout.prop(context.scene.pagekey_properties, "my_string")
        self.layout.prop(context.scene.pagekey_properties, "my_bool")
        self.layout.operator("mesh.primitive_cone_add", text="Add Cone")

bl_info = {
    "name": "PageKey Property Group Panel",
    "blender": (2, 80, 0),
    "category": "Object",
}
def register():
    bpy.utils.register_class(PAGEKEY_MyProperties)
    bpy.types.Scene.pagekey_properties = bpy.props.PointerProperty(type=PAGEKEY_MyProperties)
    bpy.utils.register_class(PAGEKEY_PT_PropertyGroupPanel)

def unregister():
    bpy.utils.unregister_class(PAGEKEY_MyProperties)
    del bpy.types.Scene.pagekey_properties
    bpy.utils.unregister_class(PAGEKEY_PT_PropertyGroupPanel)

if __name__ == "__main__":
    register()
