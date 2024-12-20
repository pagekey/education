import bpy


class PAGEKEY_PT_HelloWorldPanel(bpy.types.Panel):
    bl_idname = "PAGEKEY_PT_HelloWorldPanel"
    
    bl_category = "Greetings"
    bl_label = "Hello World 3D"
    bl_space_type = 'PROPERTIES'
    bl_region_type = 'WINDOW'
    bl_context = 'object'

    def draw(self, context):
        self.layout.label(text="Welcome to our custom panel.")
        self.layout.operator("mesh.primitive_cone_add", text="Add Cone")

bl_info = {
	"name": "PageKey Hello World Panel",
    "blender": (2, 80, 0),
    "category": "Object",
}
def register():
    bpy.utils.register_class(PAGEKEY_PT_HelloWorldPanel)

def unregister():
    bpy.utils.unregister_class(PAGEKEY_PT_HelloWorldPanel)

if __name__ == "__main__":
    register()
